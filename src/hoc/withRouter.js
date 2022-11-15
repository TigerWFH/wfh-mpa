import { useLocation, useParams, useNavigate } from 'react-router-dom';

function withRouter(Component) {
  return function (props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  };
}

export default withRouter;
