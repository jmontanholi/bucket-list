import { List as ListType } from "@/app/lib/definitions";

type Props = {
  list: ListType;
};
async function List(props: Props) {
  const { list } = props;
  console.log(
    "heyoh",
    Object.entries(list).map((pair) => pair)
  );
  return (
    <div className="flex gap-5 border-b-2 p-5">
      <p>id: {list.id}</p>
      <p>title: {list.title}</p>
      <p>description: {list.description}</p>
    </div>
  );
}

export default List;
