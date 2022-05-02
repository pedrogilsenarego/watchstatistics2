import Header from "../containers/Header";

const AdminLayout = (props) => {
  return (
    <>
      <Header {...props} />
      <div style={{ marginTop: "200px" }}>{props.children}</div>
    </>
  );
};

export default AdminLayout;
