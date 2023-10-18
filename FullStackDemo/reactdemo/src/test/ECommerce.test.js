import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserOrdersDetails from '../login/UserOrdersDetails';
import ECommerceHome from '../login/ECommerceHome';
import AdminMgtHome from '../login/AdminMgtHome';

// Mocking API server using MSW (Mock Service Worker)
const server1 = setupServer(
  rest.get('http://localhost:8080/ehome/view_order', (req, res, ctx) => {
    return res(ctx.json([{ orderId: 1, purchases: [{ product: { productName: 'Product A', price: 10, imageUrl: 'image.jpg' }, order_quantity: 2 }] }]));
  })
);

beforeAll(() => server1.listen());
afterEach(() => server1.resetHandlers());
afterAll(() => server1.close());

test('renders UserOrdersDetails component with orders', async () => {
  render(<UserOrdersDetails userId={1} cart={[]} />);

  // Wait for the API call to complete and the component to render
  await waitFor(() => screen.getByText(/order number - 1/i));

  // Check if the order details are rendered
  expect(screen.getByText(/order number - 1/i)).toBeInTheDocument();
  expect(screen.getByText(/product name: Product A/i)).toBeInTheDocument();
  expect(screen.getByText(/product price: \$10.00/i)).toBeInTheDocument();
  expect(screen.getByText(/product quantity: 2/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Product A/i)).toBeInTheDocument();
});

// Mocking the fetch function
jest.mock('node-fetch');

describe('ECommerceHome', () => {
  test('renders the component with loading message', async () => {
    render(
      <BrowserRouter>
        <ECommerceHome />
      </BrowserRouter>
    );

    // Ensure that the loading message is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Mock the response for the fetch call
    global.fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    // Wait for the component to load
    await waitFor(() => screen.getByText('E-Commerce Store'));

    // Ensure that the loading message is not present anymore
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  test('renders products after data fetching', async () => {
    render(
      <BrowserRouter>
        <ECommerceHome />
      </BrowserRouter>
    );

    // Mock the response for the fetch call
    global.fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ],
    });

    // Wait for the component to load
    await waitFor(() => screen.getByText('E-Commerce Store'));

    // Ensure that the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  // Add more tests for other functionalities in ECommerceHome component
});

const server = setupServer(
    // Mocking the fetch request for product data
    rest.get('http://localhost:8080/ehome_admin', (req, res, ctx) => {
      return res(
        ctx.json([
          { productId: 1, productName: 'Product A', price: 10, quantity: 5, description: 'Description A', imageUrl: 'imageA.jpg' },
          // Add more mocked data as needed
        ])
      );
    }),
  
    // Mocking the fetch request for adding a new product
    rest.post('http://localhost:8080/ehome_admin/admin_management_page/store_new_product', (req, res, ctx) => {
      const { productName, price, quantity, description, imageUrl } = req.body;
      // You can customize the response based on input data
      if (productName === 'ExistingProduct') {
        return res(ctx.json({ isCreated: false }));
      } else {
        return res(
          ctx.json({
            isCreated: true,
            productInfo: {
              productId: 2,
              productName,
              price,
              quantity,
              description,
              imageUrl,
            },
          })
        );
      }
    })
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  test('renders AdminMgtHome component', async () => {
    render(<AdminMgtHome />);
  
    // Wait for the product data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Product List')).toBeInTheDocument();
    });
  
    // Verify that the product list is rendered
    expect(screen.getByText('Product A')).toBeInTheDocument();
  });
  
  test('adds a new product', async () => {
    render(<AdminMgtHome />);
  
    // Wait for the product data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Product List')).toBeInTheDocument();
    });
  
    // Mock the API response for adding a new product
    server.use(
      rest.post('http://localhost:8080/ehome_admin/admin_management_page/store_new_product', (req, res, ctx) => {
        return res(
          ctx.json({
            isCreated: true,
            productInfo: {
              productId: 3,
              productName: 'NewProduct',
              price: 15,
              quantity: 10,
              description: 'Description for NewProduct',
              imageUrl: 'newProduct.jpg',
            },
          })
        );
      })
    );
  
    // Fill out the form and submit it
    fireEvent.change(screen.getByLabelText('Product Name:'), { target: { value: 'NewProduct' } });
    fireEvent.change(screen.getByLabelText('Product Price:'), { target: { value: 15 } });
    fireEvent.change(screen.getByLabelText('Product Quantity:'), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText('Product Description:'), { target: { value: 'Description for NewProduct' } });
    fireEvent.change(screen.getByLabelText('Product Image:'), { target: { value: 'newProduct.jpg' } });
  
    fireEvent.click(screen.getByText('Add Product'));
  
    // Wait for the product data to be updated
    await waitFor(() => {
      expect(screen.getByText('Product List')).toBeInTheDocument();
      expect(screen.getByText('NewProduct')).toBeInTheDocument();
    });
  });