import Product from './product';
import { MemoryRouter, Routes, Route} from "react-router";
import { http, HttpResponse, rest  } from 'msw';

export default {
  component: Product,
  decorators: [(Story) => (
      <MemoryRouter initialEntries={["/"]}>
         <Routes>
           <Route path="/" element={<Story />}/>
         </Routes>
      </MemoryRouter>)]
}

export const Default = () => <Product />;

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
