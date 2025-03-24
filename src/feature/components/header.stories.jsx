import Header from './header';
import { userEvent, within,expect } from '@storybook/test';
import { MemoryRouter, Routes, Route} from "react-router";

export default {
  component: Header,
  decorators: [(Story) => (
      <MemoryRouter initialEntries={["/"]}>
         <Routes>
           <Route path="/" element={<Story />}/>
         </Routes>
      </MemoryRouter>)],
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


