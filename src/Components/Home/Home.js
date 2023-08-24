import { connect } from "react-redux";
import "./Home.scss";
import actHome from "../../Redux/Action/actHome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home(props) {


    const nav = useNavigate();
    useEffect(() => {
        props.Home()
        // eslint-disable-next-line
    }, [])


    const lsMovieNow = props.homeState.lsHome.movieShowing?.slice(0, 6)

    const HandClickMovieDetail = (id) => {
        sessionStorage.setItem("MovieDetail", id)

        nav('/movivedetails')
    }

    return (
        <div className="Home">
            <div className="home">
                {/* {console.log(lsMovieNow)} */}
                <div className="banner">
                    <img src="https://cdn.galaxycine.vn/media/2023/7/14/2048x682_1689307072988.jpg" alt="" />
                </div>
                <div className="tab-movie">
                    <div className="container">
                        <div className="tab-movie-heading">
                            <h2><Link className="link" to="/">PHIM ĐANG CHIẾU</Link></h2>
                            <h2><Link className="link" to="/moviecomingsoon">PHIM SẮP CHIẾU</Link></h2>
                        </div>

                        <div className="movie-items">
                            <div className="tab-movie-item">
                                {
                                    lsMovieNow?.map((v, i) => {
                                        let id = v.id
                                        return (
                                            <div className="tab-movie-items">
                                                <div key={i}>
                                                    <img src={v.imageLandscape} onClick={() => { HandClickMovieDetail(id) }} alt="" />
                                                    <h4>{v.name}</h4>
                                                    <p>{v.subName}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <button className="tab-movie-btn"> <Link >Xem thêm <i class="fa-solid fa-arrow-right"></i></Link></button>
                        </div>
                    </div>

                </div>

                <div className="cmt-movie">
                    <div className="container">
                        <div className="cmt-movie-content">
                            <div className="cmt-movie-items">
                                <div className="mt-movie-item-cl">
                                    <h2>BÌNH LUẬN PHIM</h2>
                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/22/detective-conan-black-iron-submarine-chi-can-to-chuc-ao-den-xuat-hien--phim-chac-chan-hay-3_1690040747577.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>[Review] Detective Conan Black Iron Submarine: Chỉ Cần Tổ Chức Áo Đen Xuất</h5>
                                            <p>Dù chẳng được tính vào mạch truyện chính, loạt phim điện ảnh về chàng thám tử bị teo nhỏ Kudo Shinichi liên tiếp</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/17/450_1689532426644.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>[Review] Insidious The Red Door: Tình Cha Con Chữa Lành Sự Ám Ảnh Đến Từ Quỷ Dữ</h5>
                                            <p>Đã hơn 10 năm kể từ khi  Insidious gieo rắc ám ảnh kinh hoàng cho người xem. Mùa hè năm nay, phần 5 của</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/12/review-mission-impossible-7-tom-cruise-lai-cuu-mua-he-bom-tan-2023-3_1689158629415.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>[Review] Mission Impossible 7: Tom Cruise Lại Cứu Mùa Hè Bom Tấn 2023?</h5>
                                            <p>Năm ngoái, Top Gun: Maverick giúp Tom Cruise “cứu cả Hollywood” – trích lời huyền thoại làm phim Stev</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/5/mission-impossible---dead-reckoning-part-one-at-chu-bai-mang-ten-tom-cruise-2_1688540743811.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>[Preview] Mission Impossible - Dead Reckoning Part One: "Át Chủ Bài" Mang Tên</h5>
                                            <p>Vậy bí quyết nào giúp Mission: Impossible tồn tại và phát triển suốt gần 3 thập kỉ? Câu trả lời chỉ có một: Tom Cruise!</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-movie-item-cl">
                                    <h2>BLOG ĐIỆN ẢNH</h2>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/26/sfohblf_1690357583043.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>Có Gì Trong After Credit Của Conan Movie 26?</h5>
                                            <p>After credit của Conan thường hé lộ nhân vật chính của phần tiếp theo.</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/17/450_1689533100591.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>Insidious: Bí Mật Đáng Sợ Về Bóng Ma Cô Gái Có Nụ Cười Ám Ảnh</h5>
                                            <p>Chuyện gì sẽ xảy ra nếu có sự tồn tại của người sống trong cõi The Further?</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/17/45000_1689532946632.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>Tổng Hợp Dòng Thời Gian Insidious</h5>
                                            <p>Dòng thời gian hoàn chỉnh của Insidious sẽ giúp cho những ai lần đầu “ghé thăm” The Further không bị bỡ ngỡ.</p>

                                        </div>
                                    </div>

                                    <div className="mt-movie-item">
                                        <img src="https://cdn.galaxycine.vn/media/2023/7/13/conan-750_1689231996668.jpg" alt="" />
                                        <div className="mt-movie-item-desc">
                                            <h5>Phim Điện Ảnh Thứ 26 Của Conan Đạt Kỉ Lục Doanh Thu Tại Nhật Bản</h5>
                                            <p>Phim Điện Ảnh Thám Tử Lừng Danh Conan: Tàu Ngầm Sắt Màu Đen - bộ phim điện ảnh thứ 26 về chàng thám tử bị teo nhỏ đã làm mưa làm gió tại quê nhà Nhật Bản.  </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="discount">
                    <div className="container">
                        <div className="discount-content">
                            <h2>TIN KHUYẾN MÃI</h2>
                            <div className="discount-items">
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/6/5/300x450_1685935767178.jpg" alt="" />
                                </div>

                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/6/20/300_1687245037813.jpg" alt="" />
                                </div>
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/7/25/galaxy-x-mcc---banner-app_1690246841092.png" alt="" />
                                </div>
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/6/28/vnpay-4_1687946373788.jpg" alt="" />
                                </div>

                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg" alt="" />
                                </div>
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/7/25/gp-kv-chitu10k-500x750-1688717880472_1690276949009.jpg" alt="" />
                                </div>
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2022/1/17/300x450-1642060360230_1642391019890.jpg" alt="" />
                                </div>
                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/4/19/milo-kv-300x450_1681889127866.jpg" alt="" />
                                </div>

                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/1/17/bangqltv-2023-digital-1200x1800_1673940943642.jpg" alt="" />
                                </div>

                                <div className="discount-item">
                                    <img src="https://cdn.galaxycine.vn/media/2023/7/25/quy-dinh-do-tuoi-digital-1200x1800-1684835366729_1690277000962.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="galaxy-cinema">
                    <div className="container">
                        <h2>GALAXY CINEMA</h2>
                        <div className="galaxy-cinema-desc">
                            <p><b>Galaxy Cinema</b> là một trong những công ty tư nhân đầu tiên về điện ảnh được thành lập từ năm 2003, đã khẳng định thương hiệu là 1 trong 10 địa điểm vui chơi giải trí được yêu thích nhất. Ngoài hệ thống rạp chiếu phim hiện đại, thu hút hàng triệu lượt người đến xem, Galaxy Cinema còn hấp dẫn khán giả bởi không khí thân thiện cũng như chất lượng dịch vụ hàng đầu.</p>
                            <p>Đến website galaxycine.vn, khách hàng sẽ dễ dàng tham khảo các phim hay nhất, phim mới nhất đang chiếu hoặc sắp chiếu luôn được cập nhật thường xuyên. Lịch chiếu tại tất cả hệ thống rạp chiếu phim của <b>Galaxy Cinema</b> cũng được cập nhật đầy đủ hàng ngày hàng giờ trên trang chủ.</p>
                            <p>Từ vũ trụ điện ảnh Marvel, người hâm mộ sẽ có cuộc tái ngộ với Người Nhện qua Spider-Man: No Way Home hoặc Doctor Strange 2. Ngoài ra 007: No Time To Die, Turning Red, Minions: The Rise Of Gru..., là những tác phẩm hứa hẹn sẽ gây bùng nổ phòng vé trong thời gian tới</p>
                            <p>Giờ đây đặt vé tại <b>Galaxy Cinema</b> càng thêm dễ dàng chỉ với vài thao tác vô cùng đơn giản. Để mua vé, hãy vào tab Mua vé. Quý khách có thể chọn Mua vé theo phim, theo rạp, hoặc theo ngày. Sau đó, tiến hành mua vé theo các bước hướng dẫn. Chỉ trong vài phút, quý khách sẽ nhận được tin nhắn và email phản hồi Đặt vé thành công của <b>Galaxy Cinema</b>. Quý khách có thể dùng tin nhắn lấy vé tại quầy vé của <b>Galaxy Cinema</b> hoặc quét mã QR để một bước vào rạp mà không cần tốn thêm bất kỳ công đoạn nào nữa</p>
                            <p>Nếu bạn đã chọn được phim hay để xem, hãy đặt vé cực nhanh bằng box Mua Vé Nhanh ngay từ Trang Chủ. Chỉ cần một phút, tin nhắn và email phản hồi của <b>Galaxy Cinema</b> sẽ gửi ngay vào điện thoại và hộp mail của bạn.</p>
                            <p>Nếu chưa quyết định sẽ xem phim mới nào, hãy tham khảo các bộ phim hay trong mục Phim Đang Chiếu cũng như Phim Sắp Chiếu tại rạp chiếu phim bằng cách vào mục Bình Luận Phim ở Góc Điện Ảnh để đọc những bài bình luận chân thật nhất, tham khảo và cân nhắc. Sau đó, chỉ việc đặt vé bằng box Mua Vé Nhanh ngay ở đầu trang để chọn được suất chiếu và chỗ ngồi vừa ý nhất</p>
                            <p><b>Galaxy Cinema</b> luôn có những chương trình khuyến mãi, ưu đãi, quà tặng vô cùng hấp dẫn như giảm giá vé, tặng vé xem phim miễn phí, tặng Combo, tặng quà phim…  dành cho các khách hàng.</p>
                            <p>Trang web galaxycine.vn còn có mục Góc Điện Ảnh - nơi lưu trữ dữ liệu về phim, diễn viên và đạo diễn, những bài viết chuyên sâu về điện ảnh, hỗ trợ người yêu phim dễ dàng hơn trong việc lựa chọn phim và bổ sung thêm kiến thức về điện ảnh cho bản thân. Ngoài ra, vào mỗi tháng, <b>Galaxy Cinema</b> cũng giới thiệu các phim sắp chiếu hot nhất trong mục Phim Hay Tháng .</p>
                            <p>Hiện nay, <b>Galaxy Cinema</b> đang ngày càng phát triển hơn nữa với các chương trình đặc sắc, các khuyến mãi hấp dẫn, đem đến cho khán giả những bộ phim bom tấn của thế giới và Việt Nam nhanh chóng và sớm nhất.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (globalState) => {
    return {
        homeState: globalState.homeManage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Home: () => {
            dispatch({
                type: actHome.GET_HOME
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);