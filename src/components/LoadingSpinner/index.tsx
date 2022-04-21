import { Ellipsis } from "react-spinners-css";
import { useSelector } from "react-redux";

const mapState = (state: any) => ({
  loading: state.general.loading,
});

const LoadingSpinner = () => {
  const { loading } = useSelector(mapState);
  if (loading)
    return (
      <>
        <Ellipsis color='orange' />
      </>
    );
  else return null;
};

export default LoadingSpinner;
