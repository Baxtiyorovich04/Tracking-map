import { LoadingOutlined } from '@ant-design/icons';
import '../scss/loading-screen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <LoadingOutlined className="loading-icon" />
        <div className="loading-ripple">
          <div></div>
          <div></div>
        </div>
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen; 
 