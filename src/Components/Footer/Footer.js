import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
    return (
        <div className="Footer">
            <div className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-intro">
                            <h2>GIỚI THIỆU</h2>
                            <ul>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>VỀ CHÚNG TÔI</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>THỎA THUẬN SỬ DỤNG</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>QUY CHẾ HOẠT ĐỘNG</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>CHÍNH SÁCH BẢO MẬT</Link></li></div>

                            </ul>
                        </div>

                        <div className="footer-corner">
                            <h2>GÓC ĐIỆN ẢNH</h2>
                            <ul>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>THỂ LOẠI PHIM</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>BÌNH LUẬN PHIM</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>BLOG ĐIỆN ẢNH</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>PHIM HAY THÁNG</Link></li></div>
                            </ul>
                        </div>

                        <div className="footer-support">
                            <h2>HỖ TRỢ</h2>
                            <ul>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>GÓP Ý</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>SALE & SERVICES</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>RẠP / GIÁ VÉ</Link></li></div>
                                <div><i class="fa-solid fa-angles-right"></i><li><Link>TUYỂN DỤNG</Link></li></div>

                            </ul>
                        </div>

                        <div className="footer-info">
                            <h2>KẾT NỐI GALAXY CINEMA</h2>
                            <i class="fa-brands fa-square-facebook"></i>
                            <i class="fa-brands fa-youtube"></i>

                            <i class="fa-brands fa-instagram"></i>
                            <h2>DOWNLOAD APP</h2>
                            <i class="fa-brands fa-apple"></i>
                            <i class="fa-brands fa-google-play"></i>
                        </div>
                    </div>


                </div>
            </div>
            <div className="sub-footer">
                <div className="container">
                    <div className="sub-footer-content">
                        <img src="https://www.galaxycine.vn/website/images/galaxy-logo-footer.png" alt="logo-footer" />
                        <p><i>Công Ty Cổ Phần Phim Thiên Ngân, Tầng 3, Toà Nhà Bitexco Nam Long, 63A Võ Văn Tần, P. Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh</i></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;