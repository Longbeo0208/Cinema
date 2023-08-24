import { connect } from "react-redux";
import "./MovieDetails.scss";

import { useEffect } from "react";
import actDetail from "../../Redux/Action/actDetail";

function MovieDetails(props) {
    const movieDetail = sessionStorage.getItem("MovieDetail")


    useEffect(() => {
        props.MovieDetail(movieDetail)
    }, [])

    const detailMovie = props.movieDetailState.lsMovieDetail

    const title = detailMovie.description


    return (
        <div className="MovieDetails">
            <div className="moviedetails">
                {/* {console.log(props.movieDetailState.lsMovieDetail)} */}
                <div className="container">
                    <div className="moviedetails-info">
                        <div className="moviedetails-info2">
                            <div className="moviedetails-img">
                                <img src={detailMovie.imagePortrait} alt="" />
                            </div>

                            <div className="moviedetails-name">
                                <h2 className="moviedetails-heading">{detailMovie.name}</h2>
                                <h2 className="moviedetails-heading2">{detailMovie.subName}</h2>
                            </div>
                        </div>

                        <div className="moviedetails-content">
                            <h2>Nội dung phim</h2>
                            <span dangerouslySetInnerHTML={{ __html: title }} />

                        </div>

                        {/* <div className="showtime">
                            <h2>LỊCH CHIẾU</h2>
                            <div className="showtime-select">
                                <select>
                                    <option>Cả nước</option>
                                    <option>Cà Mau</option>
                                    <option>Bến Tre</option>
                                    <option>Tp.Hồ Chí Minh</option>
                                    <option>Hà Nội</option>
                                    <option>Đà Nẵng</option>
                                    <option>Đăk Lăk</option>
                                    <option>An Giang</option>
                                    <option>Khánh Hòa</option>
                                    <option>Hải Phòng</option>
                                    <option>Nghệ An</option>

                                </select>

                                <select>
                                    <option>Tất cả rạp</option>
                                    <option>Galaxy Nguyễn Du</option>
                                    <option>Galaxy Tân Bình</option>
                                    <option>Galaxy Kinh Dương Vương</option>
                                    <option>Galaxy Quang Trung</option>
                                    <option>Galaxy Bến Tre</option>
                                    <option>Galaxy Mipec Long Biên</option>
                                    <option>Galaxy Đà Nẵng</option>
                                    <option>Galaxy Cà Mau</option>
                                    <option>Galaxy Trung Chánh</option>
                                    <option>Galaxy Huỳnh Tấn Phát</option>

                                </select>
                            </div>
                            <div className="movie-booking">
                                <h4>Galaxy Co.opXtra Linh Trung</h4>
                                <div className="movie-booking-border">
                                    <div className="movie-booking-room">
                                        <p>2D - L.Tiếng </p>
                                    </div>
                                    <div className="movie-booking-time">
                                        <p>20:45</p>
                                    </div>
                                </div>

                            </div>
                        </div> */}

                    </div>

                    <div className="moviedetails-discount">
                        <h2>NHẬN KHUYẾN MÃI</h2>
                        <div className="moviedetails-discount-border">
                            <div className="moviedetails-discount-content">
                                <input type="email" placeholder="Email" />
                                <br />
                                <button>Đăng ký</button>
                            </div>
                        </div>

                        <div className="moviedetails-showing">
                            <h2>PHIM ĐANG CHIẾU</h2>

                            <div className="moviedetails-showing-item">
                                <img src={detailMovie.imageLandscape} alt="" />
                                <h4 className="moviedetails-showing1">{detailMovie.name}</h4>
                                <h4 className="moviedetails-showing2">{detailMovie.subName}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (globalState) => {
    return {
        movieDetailState: globalState.movieDetailManage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        MovieDetail: (movieDetail) => {
            dispatch({
                type: actDetail.GET_MOVIEDETAIL,
                payload: movieDetail

            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);