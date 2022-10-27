import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { FormGroup } from "@mui/material";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LightOutlinedIcon from "@mui/icons-material/LightOutlined";
import "../css/header.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CategoryNavbar from "./main/CategoryNavbar";

const drawerWidth = 450;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "100px",
  backgroundColor: "#F0F0F0",
  "&:hover": {
    backgroundColor: "lightgray",
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(2),
    // width: "1100px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Header = () => {
  const [cartCount, setCartCount] = React.useState(0); //장바구니에 담긴 제품 개수
  const [loginUser, setLoginUser] = React.useState(null);
  const [word, setWord] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const onSubmit = async (e) => {
    if (e.which === 13) {
      window.location.href = "/search/" + word;
    }
  };

  const logout = React.useCallback((e) => {
    // console.log(e);
    // e.preventDefault();
    sessionStorage.removeItem("USER_INFO");
    sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("cartCount");
    sessionStorage.removeItem("USER_ROLE");
    //localStorage.removeItem("cartCount");
    setLoginUser(null);
    window.location.href = "/";
  }, []);

  React.useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem("USER_INFO")));
    setCartCount(JSON.parse(sessionStorage.getItem("cartCount")));
  }, []);

  React.useEffect(() => {
    if (loginUser !== null && loginUser.userId == "admin") {
      setIsAdmin(true);
    }
  }, [loginUser]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [CategoryPage, setCategoryPage] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const categoryClick = (e) => {
    const { name } = e.target;
    setCategoryPage(name);
  };

  // const navigate = useNavigate();
  // const search = (event) => {
  //   if (event.key === "Enter") {
  //     //입력한 검색어를 읽어와서
  //     //url을 바꿔준다
  //     let keyword = event.target.value;
  //     console.log("keyword", keyword);
  //     asdf
  //     //url을 바꿔준다
  //     navigate(`/list/?q=${keyword}`);
  //   }
  // };
  const moveToCategoryList = (param) => {
    window.location.href = `/list/${encodeURI(param)}`;
  };

  const [productList, setProductList] = useState([]);
  const [productImageList, setProductImageList] = useState([]);

  const getProducts = async () => {
    let url = `http://localhost:8080/api/main/getMainProductList`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log("헤더에서 호출", data.productList);
    setProductList(data.productList);
    setProductImageList(data.productImageList);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <div className="greenHeaderHover">
            <Link href="#">
              <div className="greenHeaderBtn">
                <LocalShippingOutlinedIcon sx={{ color: "white" }} />
                <p className="greenHeaderText">배송 서비스</p>
              </div>
            </Link>
          </div>

          <div className="greenHeaderHover">
            <Link href="#">
              <div className="greenHeaderBtn">
                <CelebrationOutlinedIcon sx={{ color: "white" }} />
                <p className="greenHeaderText">이벤트 및 프로모션</p>
              </div>
            </Link>
          </div>

          <div className="greenHeaderHover">
            <Link href="/showroom">
              <div className="greenHeaderBtn">
                <LightOutlinedIcon sx={{ color: "white" }} />
                <p className="greenHeaderText">온라인쇼룸</p>
              </div>
            </Link>
          </div>
        </FormGroup>

        <div className="logoSearchbarLogin">
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", boxShadow: "none" }}
          >
            <Toolbar>
              <div className="menuIcon">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  sx={{
                    mr: 2,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </div>
              <Link href="/">
                <img
                  className="logo"
                  src="../images/logo_2.png"
                  alt="헤더로고"
                />
              </Link>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색어 입력"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    setWord(e.target.value);
                    console.log(word);
                  }}
                  onKeyPress={onSubmit}
                />
                {/* 
                <button type="button">
                  검색
                </button> */}
              </Search>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                {loginUser !== null ? (
                  <>
                    <div className="loginLogout">
                      <Link
                        href="/mypage"
                        className="loginName"
                        sx={{ textDecoration: "none" }}
                      >
                        <PermIdentityOutlinedIcon
                          sx={{
                            fontSize: 30,
                            marginLeft: "50px",
                            color: "black",
                          }}
                        />
                        <p>{loginUser.userNickname}</p>
                      </Link>

                      <div className="logout">
                        <Link onClick={logout} href="/">
                          로그아웃
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="login">
                    <Link href="/login" sx={{ marginLeft: "50px" }}>
                      로그인 또는 가입하기
                    </Link>
                  </div>
                )}

                {loginUser !== null ? (
                  <>
                    <Link href="/wishlist">
                      <FavoriteBorderOutlinedIcon
                        sx={{ margin: "0 15px", fontSize: 28, color: "black" }}
                      />
                    </Link>

                    <Link href="/cart">
                      <Badge badgeContent={cartCount} color="success">
                        <ShoppingCartOutlinedIcon
                          sx={{
                            margin: "0 15px",
                            fontSize: 28,
                            color: "black",
                          }}
                        />
                      </Badge>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <FavoriteBorderOutlinedIcon
                        sx={{ margin: "0 15px", fontSize: 28, color: "black" }}
                      />
                    </Link>

                    <Link href="/login">
                      <Badge badgeContent={cartCount} color="success">
                        <ShoppingCartOutlinedIcon
                          sx={{
                            margin: "0 15px",
                            fontSize: 28,
                            color: "black",
                          }}
                        />
                      </Badge>
                    </Link>
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? <CloseIcon /> : <CloseIcon />}
              </IconButton>
            </DrawerHeader>

            <img
              className="logo"
              style={{ margin: "0 0 16px 56px" }}
              src="../images/logo_2.png"
              alt="네브바로고"
            />
          </div>
          <div className="nav_hr">
            <hr />
          </div>
          <Divider />
          <List sx={{ paddingLeft: "40px" }}>
            <ListItem disablePadding style={{ height: "48px" }}>
              <ListItemButton>
                <CategoryNavbar moveToCategoryList={moveToCategoryList} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  href="/showroom"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemText primary="인테리어 쇼룸" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="이벤트 및 프로모션" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="고객센터" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  href="/infoStore"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemText primary="지점안내" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="배송추적" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  href="/mypage"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemText primary="마이페이지" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="직원소개" />
              </ListItemButton>
            </ListItem>

            {isAdmin ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <Link
                      href="/admin"
                      sx={{ color: "black", textDecoration: "none" }}
                    >
                      <ListItemText primary="관리자페이지" />
                    </Link>
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <></>
            )}
          </List>

          <Divider />
        </Drawer>
      </Box>
      <hr className="headerLine" />
    </>
  );
};

export default Header;
