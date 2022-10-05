import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Activities from "./PostList";

const BannerPostList = () => (
    <>
    <Banner/>
    <Activities/>
    <Outlet/>
    </>
);

export default BannerPostList