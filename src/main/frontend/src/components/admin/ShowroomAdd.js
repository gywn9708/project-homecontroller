import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import AdminItemList from "./AdminItemList";
import List from "@mui/material/List";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const mdTheme = createTheme();

const showroomFileList = []; // 업로드한 파일들을 저장하는 배열

function ShowroomAdd() {
  //완료시 모달창 띄우기
  const [show, setShow] = useState(false);

  //이미지 업로드
  const onshowroomChangeImg = (e) => {
    console.log(e.target.files);
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    uploadFiles.forEach((uploadFile) => {
      showroomFileList.push(uploadFile);
    });
  };

  const onShowroomSubmitHandler = (event) => {
    event.preventDefault();

    const f = new FormData(event.target);

    const fObj = {};
    f.forEach((value, key) => (fObj[key] = value));

    fObj.uploadFiles = showroomFileList;

    const showroomItems = [];
    console.log(fObj[`productNo1`]);
    for (let i = 1; i < 6; i++) {
      if (fObj[`productNo${i}`] !== "" && fObj[`productNo${i}`] !== null) {
        showroomItems.push(fObj[`productNo${i}`]);
      }
    }

    fObj.showroomItems = showroomItems;
    fObj.showroomItemsLength = showroomItems.length;
    // const formData = new FormData();

    // formData.append(
    //   "productNo",
    //   new Blob([JSON.stringify(event.target.productNo.value)], {
    //     type: "application/json",
    //   })
    // );

    // fileList.forEach((file) => {
    //   // 파일 데이터 저장
    //   formData.append("uploadFiles", file);
    // });

    console.log(fObj.uploadFiles);

    axios({
      url: "http://localhost:8080/api/admin/insertShowroom",
      method: "POST",
      data: fObj,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setShow(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //쇼룸 색상
  const showroomColor = [
    {
      value: "red",
      label: "빨간색",
    },
    {
      value: "yellow",
      label: "노란색",
    },
    {
      value: "green",
      label: "초록색",
    },
    {
      value: "blue",
      label: "파란색",
    },
    {
      value: "purple",
      label: "보라색",
    },
    {
      value: "white",
      label: "흰색",
    },
    {
      value: "beige",
      label: "베이지",
    },
    {
      value: "black",
      label: "검은색",
    },
    {
      value: "gray",
      label: "회색",
    },
    {
      value: "pink",
      label: "분홍색",
    },
  ];
  const [ShowroomColor, setShowroomColor] = React.useState("");

  const handleShowroomColorChange = (event) => {
    setShowroomColor(event.target.value);
  };

  const handleClose = () => setShow(false);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }} style={{ maxWidth: "1750px" }}>
        <Box>
          <List>
            <AdminItemList />
          </List>
        </Box>
        <Container style={{ marginTop: "5%" }}>
          <form
            noValidate
            onSubmit={onShowroomSubmitHandler}
            id="ShowroomCreateForm"
            encType="multipart/form-data"
          >
            <h1>인테리어쇼룸 등록폼</h1>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 3, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-select-color-native"
                  select
                  name="showroomColor"
                  label="쇼룸색상"
                  value={ShowroomColor}
                  onChange={handleShowroomColorChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="인테리어 쇼룸 색상을 선택해주세요"
                >
                  {showroomColor.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </TextField>
                <br />
                <TextField
                  id="outlined-required"
                  name="productNo1"
                  label="제품번호1"
                  type="number"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationLeft1"
                  label="제품번호1 - 제품left위치"
                  type="text"
                  helperText="ex) left: ''30%''"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationTop1"
                  label="제품번호1 - 제품top위치"
                  type="text"
                  helperText="ex) top: ''45%''"
                />
                <br />
                <TextField
                  id="outlined-required"
                  name="productNo2"
                  label="제품번호2"
                  type="number"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationLeft2"
                  label="제품번호2 - 제품left위치"
                  type="text"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationTop2"
                  label="제품번호2 - 제품top위치"
                  type="text"
                />
                <br />
                <TextField
                  id="outlined-required"
                  name="productNo3"
                  label="제품번호3"
                  type="number"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationLeft3"
                  label="제품번호3 - 제품left위치"
                  type="text"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationTop3"
                  label="제품번호3 - 제품top위치"
                  type="text"
                />
                <br />
                <TextField
                  id="outlined-required"
                  name="productNo4"
                  label="제품번호4"
                  type="number"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationLeft4"
                  label="제품번호4 - 제품left위치"
                  type="text"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationTop1"
                  label="제품번호4 - 제품top위치"
                  type="text"
                />
                <br />
                <TextField
                  id="outlined-required"
                  name="productNo5"
                  label="제품번호5"
                  type="number"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationLeft5"
                  label="제품번호5 - 제품left위치"
                  type="text"
                />
                <TextField
                  id="outlined-required"
                  name="productLocationTop1"
                  label="제품번호5 - 제품top위치"
                  type="text"
                />

                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "46%" },
                  }}
                >
                  <label htmlFor="profile-upload" />
                  <input
                    type="file"
                    multiple="multiple"
                    id="profile-upload"
                    name="uploadFiles"
                    onChange={onshowroomChangeImg}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                    style={{ marginTop: "2%" }}
                  >
                    <Button variant="contained" color="success" type="submit">
                      등록하기
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>인테리어 쇼룸 등록완료</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ㅊㅋㅊㅋ쇼룸 등록이 완료 됐습니다.٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleClose}
                        >
                          닫기
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Stack>
                </Box>
              </div>
            </Box>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ShowroomAdd;
