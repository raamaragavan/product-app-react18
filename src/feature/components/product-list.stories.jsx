
import { MemoryRouter, Routes, Route} from "react-router";
import { http, HttpResponse, rest  } from 'msw';
import ProductList from './product-list';
import store from "../../store";
import { Provider } from "react-redux";

export default {
  component: ProductList,
  decorators: [(Story) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
         <Routes>
           <Route path="/" element={<Story />}/>
         </Routes>
      </MemoryRouter>
      </Provider>
      )]
}

export const Default = () => <ProductList />;

const TestData = {
"products": [],
"limit": 10,
"total":194,
"skip": 0
}

// const Template = () => <Product />;

// export const EmptyResponse = Template.bind({});
//         EmptyResponse.parameters = {
//           handlers: [
//                   http.get('https://dummyjson.com/products', () => {
//                     return HttpResponse.json(TestData);
//                   }),
//                 ],
//         };
