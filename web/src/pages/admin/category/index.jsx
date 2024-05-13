import { Helmet } from "react-helmet-async";
import CategoryList from "./CategoryList";

export default function Category() {
  return (
    <>
      <Helmet>
        <title>List Category</title>
      </Helmet>
      <CategoryList />
    </>
  )
}
