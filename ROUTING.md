# MemoryCard

************PrivateRoute************

***********************
IF WE USE True/False from token it will immediately Refresh Page to.
IF WE USE True/False from Store(loginState) it will Redirect to '/' then go to currentPage.
***********************

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginState = useSelector(selectLogin);
  const loginProcces = useSelector(selectLoginProcces);
  const history = useHistory();
  const storageToken = localStorage.getItem("token");
  useEffect(() => {
    if (storageToken === null) {
      history.push("/register");
    }
  }, [storageToken, history]);
  console.log(loginState, loginProcces);
  return (
    <>
      <Route
        {...rest}
        render={(props) => loginState && <Component {...props} />}
      />
    </>
  );
};

export default PrivateRoute;

*****************************************************


************Routing Component************

***********************
If We Logged in then '/register' & '/login' will redirect us to '/';
!ORDER IS IMPORTANT!
***********************

 <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          {storageToken && <Redirect from="/register" to="/" />}
          {storageToken && <Redirect from="/login" to="/" />}
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute exact path="/allcards" component={AllCards} />
          <PrivateRoute path="/wishlist" component={Wishlist} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute path="/allcards/:id" component={DynamicPage} />

          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
 </div>
 
