import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { productCategories } from '@/data/categories'
import { productsCatalog } from '@/data/products'
import type { Product } from '@/features/products/types'
import { ShopPage } from '@/pages/shop/ShopPage'
import { server } from '@/mocks/server'
import { renderWithProviders } from '@/test/renderWithProviders'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const PRODUCTS_ENDPOINT = '*/products'
const DEFAULT_PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 300

type ProductsRequestParams = {
  search?: string
  page?: number
  pageSize?: number
  categoryId?: string
  sort?: string
}

type FilterCase = {
  buttonName: string
  queryParam: string
  queryValue: string
  titlePrefix: string
  product: Product
}

const getSearchParam = (url: URL, key: string): string | null => {
  const value = url.searchParams.get(key)
  return value && value.trim().length > 0 ? value : null
}

const buildListResponse = (
  items = productsCatalog.slice(0, DEFAULT_PAGE_SIZE),
  pagination?: {
    page?: number
    pageSize?: number
    totalItems?: number
    totalPages?: number
  },
) => {
  const page = pagination?.page ?? 1
  const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE
  const totalItems = pagination?.totalItems ?? items.length
  const totalPages = pagination?.totalPages ?? (totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize))

  return {
    items,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
    },
  }
}

const renderShopPage = () => renderWithProviders(<ShopPage />, { initialRoutes: ['/shop'] })

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('ShopPage React Query integration', () => {
  it('renders API products and metadata with initial loading state', async () => {
    server.use(
      http.get(PRODUCTS_ENDPOINT, async () => {
        await delay(120)
        return HttpResponse.json(buildListResponse(productsCatalog.slice(0, 3), { totalItems: productsCatalog.length, totalPages: 4 }))
      }),
    )

    renderShopPage()

    expect(screen.getByText('Loading products...')).toBeInTheDocument()

    const firstProduct = productsCatalog[0]
    expect(await screen.findByText(firstProduct.title.en)).toBeInTheDocument()
    expect(screen.getAllByText(`${productsCatalog.length} products found`)).toHaveLength(2)
  })

  it('renders retry state on API failure and recovers on retry', async () => {
    let shouldFail = true

    server.use(
      http.get(PRODUCTS_ENDPOINT, () => {
        if (shouldFail) {
          return HttpResponse.json(
            { error: { code: 'INTERNAL_ERROR', message: 'Temporary failure' } },
            { status: 500 },
          )
        }

        return HttpResponse.json(buildListResponse(productsCatalog.slice(0, 2), { totalItems: 2, totalPages: 1 }))
      }),
    )

    renderShopPage()

    expect(await screen.findByRole('alert')).toHaveTextContent('The product service is temporarily unavailable.')
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
    expect(screen.queryByText('No products found.')).not.toBeInTheDocument()
    expect(screen.queryByText(productsCatalog[0].title.en)).not.toBeInTheDocument()

    shouldFail = false
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(await screen.findByText(productsCatalog[0].title.en)).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders explicit empty state for successful empty responses', async () => {
    server.use(
      http.get(PRODUCTS_ENDPOINT, () => {
        return HttpResponse.json(
          buildListResponse([], {
            page: 1,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 0,
            totalPages: 0,
          }),
        )
      }),
    )

    renderShopPage()

    expect(await screen.findByText('No products found.')).toBeInTheDocument()
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByText(productsCatalog[0].title.en)).not.toBeInTheDocument()
  })

  it('sends category filters to API and renders returned items only', async () => {
    const selectedCategory = productCategories[0]
    const selectedLabel = selectedCategory.name.en
    let capturedCategoryId: string | null = null

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedCategoryId = getSearchParam(url, 'categoryId')

        if (capturedCategoryId === selectedCategory.id) {
          const item = productsCatalog.find((product) => product.categoryId === selectedCategory.id) ?? productsCatalog[0]
          return HttpResponse.json(buildListResponse([{ ...item, title: { ...item.title, en: 'Category Narrow Result' } }], { totalItems: 1, totalPages: 1 }))
        }

        return HttpResponse.json(buildListResponse(productsCatalog.slice(0, 2), { totalItems: 2, totalPages: 1 }))
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)

    const categoryButtons = screen.getAllByRole('button', { name: selectedLabel })
    await userEvent.click(categoryButtons[0])

    expect(await screen.findByText('Category Narrow Result')).toBeInTheDocument()
    expect(capturedCategoryId).toBe(selectedCategory.id)
    expect(screen.queryByText(productsCatalog[0].title.en)).not.toBeInTheDocument()
  })

  it('uses server-driven sorting order without applying a second client sort', async () => {
    const baseA = productsCatalog[0]
    const baseB = productsCatalog[1]
    const highPriceFirst = {
      ...baseA,
      id: 'sort-high',
      slug: 'sort-high',
      price: 1200,
      title: { ...baseA.title, en: 'Sort High Price First' },
    }
    const lowPriceSecond = {
      ...baseB,
      id: 'sort-low',
      slug: 'sort-low',
      price: 100,
      title: { ...baseB.title, en: 'Sort Low Price Second' },
    }

    let capturedSort: string | null = null

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedSort = getSearchParam(url, 'sort')
        return HttpResponse.json(buildListResponse([highPriceFirst, lowPriceSecond], { totalItems: 2, totalPages: 1 }))
      }),
    )

    renderShopPage()

    await screen.findByText('Sort High Price First')

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'price-asc')

    const high = await screen.findByText('Sort High Price First')
    const low = await screen.findByText('Sort Low Price Second')

    expect(capturedSort).toBe('price-asc')
    expect(high.compareDocumentPosition(low) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('sends color filters to the API', async () => {
    const selectedProduct = productsCatalog.find((product) => product.colors.length > 0) ?? productsCatalog[0]
    const selectedColor = selectedProduct.colors[0]
    const baselineProduct = productsCatalog[0]
    let capturedColorId: string | null = null

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedColorId = getSearchParam(url, 'colorId')

        if (capturedColorId !== selectedColor.id) {
          return HttpResponse.json(buildListResponse([baselineProduct], { totalItems: 1, totalPages: 1 }))
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...selectedProduct,
              id: 'color-filter-result',
              slug: 'color-filter-result',
              title: { ...selectedProduct.title, en: 'Color Filter Result' },
            },
          ], { totalItems: 1, totalPages: 1 }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    await userEvent.click(screen.getByRole('button', { name: selectedColor.name.en }))

    expect(await screen.findByText('Color Filter Result')).toBeInTheDocument()
    expect(capturedColorId).toBe(selectedColor.id)
  })

  it('sends size filters to the API', async () => {
    const selectedProduct = productsCatalog.find((product) => product.sizes.some((size) => size.available)) ?? productsCatalog[0]
    const selectedSize = selectedProduct.sizes.find((size) => size.available) ?? selectedProduct.sizes[0]
    const baselineProduct = productsCatalog[0]
    let capturedSizeId: string | null = null

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedSizeId = getSearchParam(url, 'sizeId')

        if (capturedSizeId !== selectedSize.id) {
          return HttpResponse.json(buildListResponse([baselineProduct], { totalItems: 1, totalPages: 1 }))
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...selectedProduct,
              id: 'size-filter-result',
              slug: 'size-filter-result',
              title: { ...selectedProduct.title, en: 'Size Filter Result' },
            },
          ], { totalItems: 1, totalPages: 1 }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    await userEvent.click(screen.getByRole('button', { name: selectedSize.label }))

    expect(await screen.findByText('Size Filter Result')).toBeInTheDocument()
    expect(capturedSizeId).toBe(selectedSize.id)
  })

  it.each<FilterCase>([
    {
      buttonName: 'In stock',
      queryParam: 'availability',
      queryValue: 'in-stock',
      titlePrefix: 'Availability In Stock',
      product: productsCatalog.find((product) => product.stock > 0) ?? productsCatalog[0],
    },
    {
      buttonName: 'Out of stock',
      queryParam: 'availability',
      queryValue: 'out-of-stock',
      titlePrefix: 'Availability Out Of Stock',
      product: productsCatalog.find((product) => product.stock <= 0) ?? productsCatalog[0],
    },
    {
      buttonName: 'Low stock',
      queryParam: 'availability',
      queryValue: 'low-stock',
      titlePrefix: 'Availability Low Stock',
      product: productsCatalog.find((product) => product.stock > 0 && product.stock <= 5) ?? productsCatalog[0],
    },
  ])('sends availability filters to the API', async ({ buttonName, queryParam, queryValue, titlePrefix, product }) => {
    let capturedValue: string | null = null
    const baselineProduct = productsCatalog[0]

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedValue = getSearchParam(url, queryParam)

        if (capturedValue !== queryValue) {
          return HttpResponse.json(buildListResponse([baselineProduct], { totalItems: 1, totalPages: 1 }))
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...product,
              id: `${queryValue}-result`,
              slug: `${queryValue}-result`,
              title: { ...product.title, en: `${titlePrefix} Result` },
            },
          ], { totalItems: 1, totalPages: 1 }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    await userEvent.click(screen.getByRole('button', { name: buttonName }))

    expect(await screen.findByText(`${titlePrefix} Result`)).toBeInTheDocument()
    expect(capturedValue).toBe(queryValue)
  })

  it.each<FilterCase>([
    {
      buttonName: 'Sale',
      queryParam: 'sale',
      queryValue: 'true',
      titlePrefix: 'Sale Filter',
      product: productsCatalog.find((product) => Boolean(product.compareAtPrice && product.compareAtPrice > product.price)) ?? productsCatalog[0],
    },
    {
      buttonName: 'Limited',
      queryParam: 'limited',
      queryValue: 'true',
      titlePrefix: 'Limited Filter',
      product: productsCatalog.find((product) => product.isLimited) ?? productsCatalog[0],
    },
    {
      buttonName: 'Featured',
      queryParam: 'featured',
      queryValue: 'true',
      titlePrefix: 'Featured Filter',
      product: productsCatalog.find((product) => product.isFeatured) ?? productsCatalog[0],
    },
    {
      buttonName: 'New',
      queryParam: 'newArrival',
      queryValue: 'true',
      titlePrefix: 'New Filter',
      product: productsCatalog.find((product) => product.isNewArrival) ?? productsCatalog[0],
    },
    {
      buttonName: 'Best seller',
      queryParam: 'bestseller',
      queryValue: 'true',
      titlePrefix: 'Best Seller Filter',
      product: productsCatalog.find((product) => product.isBestSeller) ?? productsCatalog[0],
    },
  ])('sends badge filters to the API', async ({ buttonName, queryParam, queryValue, titlePrefix, product }) => {
    let capturedValue: string | null = null
    const baselineProduct = productsCatalog[0]
    const initialProducts = [
      baselineProduct,
      productsCatalog.find((item) => item.isNewArrival) ?? baselineProduct,
    ]

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedValue = getSearchParam(url, queryParam)

        if (capturedValue !== queryValue) {
          return HttpResponse.json(
            buildListResponse(initialProducts, { totalItems: initialProducts.length, totalPages: 1 }),
          )
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...product,
              id: `${queryParam}-result`,
              slug: `${queryParam}-result`,
              title: { ...product.title, en: `${titlePrefix} Result` },
            },
          ], { totalItems: 1, totalPages: 1 }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    await userEvent.click(screen.getByRole('button', { name: buttonName }))

    expect(await screen.findByText(`${titlePrefix} Result`)).toBeInTheDocument()
    expect(capturedValue).toBe(queryValue)
  })

  it('sends bestseller sorting to the API and preserves server order', async () => {
    const bestSellerFirst = {
      ...productsCatalog[0],
      id: 'best-seller-first',
      slug: 'best-seller-first',
      title: { ...productsCatalog[0].title, en: 'Best Seller First' },
      isBestSeller: true,
      reviewsCount: 999,
    }
    const bestSellerSecond = {
      ...productsCatalog[1],
      id: 'best-seller-second',
      slug: 'best-seller-second',
      title: { ...productsCatalog[1].title, en: 'Best Seller Second' },
      isBestSeller: true,
      reviewsCount: 500,
    }

    let capturedSort: string | null = null

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        capturedSort = getSearchParam(url, 'sort')
        return HttpResponse.json(buildListResponse([bestSellerFirst, bestSellerSecond], { totalItems: 2, totalPages: 1 }))
      }),
    )

    renderShopPage()

    await screen.findByText('Best Seller First')

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'bestseller')

    const first = await screen.findByText('Best Seller First')
    const second = await screen.findByText('Best Seller Second')

    expect(capturedSort).toBe('bestseller')
    expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('uses the default MSW products handler for bestseller sorting', async () => {
    const expectedBestsellerOrder = [...productsCatalog]
      .sort((a, b) => {
        const bestsellerDiff = Number(b.isBestSeller) - Number(a.isBestSeller)
        if (bestsellerDiff !== 0) {
          return bestsellerDiff
        }

        const reviewsDiff = b.reviewsCount - a.reviewsCount
        if (reviewsDiff !== 0) {
          return reviewsDiff
        }

        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) {
          return ratingDiff
        }

        const timeDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt)
        if (timeDiff !== 0) {
          return timeDiff
        }

        return a.id.localeCompare(b.id)
      })
      .slice(0, 2)

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'bestseller')

    const first = await screen.findByText(expectedBestsellerOrder[0].title.en)
    const second = await screen.findByText(expectedBestsellerOrder[1].title.en)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('debounces search query params and trims submitted value', async () => {
    const capturedSearchValues: Array<string | null> = []

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        const searchValue = getSearchParam(url, 'search')
        capturedSearchValues.push(searchValue)
        return HttpResponse.json(buildListResponse(productsCatalog.slice(0, 1), { totalItems: 1, totalPages: 1 }))
      }),
    )

    renderShopPage()

    await screen.findByText(productsCatalog[0].title.en)
    capturedSearchValues.length = 0

    const searchInput = screen.getByRole('searchbox', { name: 'Search by style, brand, SKU, or collection' })

    vi.useFakeTimers()
    try {
      fireEvent.change(searchInput, { target: { value: '   aurora   ' } })
      await vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS)
      await vi.advanceTimersByTimeAsync(0)

      vi.useRealTimers()

      await waitFor(() => {
        expect(capturedSearchValues).toContain('aurora')
      })
      expect(capturedSearchValues[capturedSearchValues.length - 1]).toBe('aurora')

      const requestCountAfterSearch = capturedSearchValues.length

      vi.useFakeTimers()

  fireEvent.change(searchInput, { target: { value: '' } })
      await vi.advanceTimersByTimeAsync(0)

      vi.useRealTimers()

      await waitFor(() => {
        expect(searchInput).toHaveValue('')
      })

      const postClearSearchValues = capturedSearchValues.slice(requestCountAfterSearch)
      expect(postClearSearchValues.every((value) => value === null)).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  }, 10000)

  it('resets page to 1 when result-defining filters change', async () => {
    const requests: ProductsRequestParams[] = []

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') ?? '1')
        const sort = url.searchParams.get('sort') ?? undefined

        requests.push({
          page,
          sort,
        })

        return HttpResponse.json(
          buildListResponse([
            {
              ...productsCatalog[0],
              id: `page-${page}`,
              slug: `page-${page}`,
              title: { ...productsCatalog[0].title, en: `Page ${page} Product` },
            },
          ], {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 36,
            totalPages: 3,
          }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText('Page 1 Product')
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 2' }))

    expect(await screen.findByText('Page 2 Product')).toBeInTheDocument()

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'newest')

    expect(await screen.findByText('Page 1 Product')).toBeInTheDocument()
    await waitFor(() => {
      expect(requests.at(-1)?.page).toBe(1)
    })
  }, 10000)

  it('uses API pagination metadata for page navigation and active page state', async () => {
    let lastPage = 1

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') ?? '1')
        lastPage = page

        return HttpResponse.json(
          buildListResponse([
            {
              ...productsCatalog[0],
              id: `pagination-${page}`,
              slug: `pagination-${page}`,
              title: { ...productsCatalog[0].title, en: `Pagination Page ${page}` },
            },
          ], {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 30,
            totalPages: 3,
          }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText('Pagination Page 1')

    await userEvent.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(await screen.findByText('Pagination Page 2')).toBeInTheDocument()
    expect(lastPage).toBe(2)
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute('aria-current', 'page')
  }, 10000)

  it('keeps previous products visible during page transitions and shows background indicator', async () => {
    server.use(
      http.get(PRODUCTS_ENDPOINT, async ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') ?? '1')

        if (page === 2) {
          await delay(180)
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...productsCatalog[0],
              id: `transition-${page}`,
              slug: `transition-${page}`,
              title: { ...productsCatalog[0].title, en: `Transition Page ${page}` },
            },
          ], {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 24,
            totalPages: 2,
          }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText('Transition Page 1')
    await userEvent.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(screen.getByText('Transition Page 1')).toBeInTheDocument()
    expect(screen.getByText('Updating products...')).toBeInTheDocument()
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument()

    expect(await screen.findByText('Transition Page 2')).toBeInTheDocument()
  }, 10000)

  it('does not repeatedly retry invalid query responses (HTTP 400)', async () => {
    let page1Calls = 0
    let page2Calls = 0

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') ?? '1')

        if (page === 1) {
          page1Calls += 1
        } else if (page === 2) {
          page2Calls += 1
        }

        if (page === 2) {
          return HttpResponse.json({ error: { code: 'INVALID_PAGINATION', message: 'Invalid pagination request.' } }, { status: 400 })
        }

        return HttpResponse.json(
          buildListResponse([
            {
              ...productsCatalog[0],
              id: `invalid-${page}`,
              slug: `invalid-${page}`,
              title: { ...productsCatalog[0].title, en: `Invalid Page ${page}` },
            },
          ], {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 24,
            totalPages: 2,
          }),
        )
      }),
    )

    renderShopPage()

    await screen.findByText('Invalid Page 1')
    expect(page1Calls).toBeGreaterThanOrEqual(1)
    
    await userEvent.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('The product request could not be completed.')

    // 400 errors should not be retried, so page 2 should be called exactly once
    expect(page2Calls).toBe(1)
  })
})

describe('useProductsQuery cache keys', () => {
  it('reuses equivalent params cache and separates distinct pages', async () => {
    let requestCount = 0

    server.use(
      http.get(PRODUCTS_ENDPOINT, ({ request }) => {
        const url = new URL(request.url)
        requestCount += 1

        const page = Number(url.searchParams.get('page') ?? '1')
        return HttpResponse.json(
          buildListResponse([
            {
              ...productsCatalog[0],
              id: `hook-${page}`,
              slug: `hook-${page}`,
              title: { ...productsCatalog[0].title, en: `Hook Page ${page}` },
            },
          ], {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
            totalItems: 24,
            totalPages: 2,
          }),
        )
      }),
    )

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: Infinity,
        },
      },
    })

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, rerender } = renderHook(
      ({ page }) => useProductsQuery({ page, pageSize: DEFAULT_PAGE_SIZE }),
      {
        initialProps: { page: 1 },
        wrapper,
      },
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(requestCount).toBe(1)

    rerender({ page: 1 })
    await waitFor(() => {
      expect(result.current.data?.pagination.page).toBe(1)
    })
    expect(requestCount).toBe(1)

    rerender({ page: 2 })
    await waitFor(() => {
      expect(result.current.data?.pagination.page).toBe(2)
    })
    expect(requestCount).toBe(2)
  })
})
