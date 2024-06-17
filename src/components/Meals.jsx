import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const config = {};
export default function Meals() {
  //const [mealsdata, setMealsData] = useState([]);

  const url = "http://localhost:3000/meals";
  const initialData = [];
  const {
    data: mealsdata,
    error,
    fetching: isLoading,
  } = useHttp(url, config, initialData);
  // useEffect(() => {
  //   async function fetchMealsData() {
  //     const respData = await fetch("http://localhost:3000/meals");

  //     if (!respData.ok) {
  //       //return
  //     }
  //     const data = await respData.json();
  //     console.log(data);
  //     setMealsData(data);
  //   }

  //   fetchMealsData();
  // }, []);
  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }
  return (
    <ul id="meals">
      {mealsdata.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
