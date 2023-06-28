import YarnStockList from "../../components/YarnStockList";
import Navigation from "../../components/Navigation";
import Heading from "../../components/Heading";
import { Main } from "../../styles";

export default function YarnsStockPage() {
  return (
    <Main>
      <Heading>Yarn Stocks</Heading>
      <YarnStockList />
      <Navigation />
    </Main>
  );
}
