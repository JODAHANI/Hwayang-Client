import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Notification = ({ notification }) => {
  return (
    <div className="notification w-full h-auto bg-[#F7F8FA]">
      <div className="inner max-w-screen-2xl h-auto m-auto">
        <Slider {...settings}>
          {notification?.success &&
            notification.notification.map((item) => (
              <Link
                className="block w-full h-auto focus:outline-0"
                to={{
                  // pathname: `/admin/notification/${item.id}`,
                  pathname: `/notification/${item._id}`,
                  state: { item },
                }}
                key={item._id}
              >
                <img
                  className="notification-img block w-full object-cover rounded"
                  src={`http://localhost:80/${item.imagePath}`}
                  alt="공지이미지"
                />
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Notification;
