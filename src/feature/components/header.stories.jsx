import Header from './header';
import { userEvent, within,expect } from '@storybook/test';
import { MemoryRouter, Routes, Route} from "react-router";
import store from '../../store';
import { Provider } from 'react-redux';

export default {
  component: Header,
  decorators: [(Story) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
         <Routes>
           <Route path="/" element={<Story />}/>
         </Routes>
      </MemoryRouter>
      </Provider>
      )],
}

export const Default = () => <Header />;

export const openSubscribeModal = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const subscribeButton = await canvas.getByRole('button', { name: 'Subscribe' });
    await userEvent.click(subscribeButton);
    await expect(canvas.getByText('Subscribe')).toBeInTheDocument();
  },
}


