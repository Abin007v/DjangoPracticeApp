import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import { Button, Input, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState(null);
  const fetch = async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/note/");
    console.log(data);
    if (data.data) setdata(data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const add = async () => {
    try {
      const obj = {
        title: title,
        content: content,
      };
      const data = await axios.post("http://127.0.0.1:8000/api/note/", obj);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const regiseter = () => {};
  return (
    <Box className="App">
      <Box sx={{ background: "gray" }}>
        <Box>title</Box>
        <Input onChange={(e) => setTitle(e.target.value)} />
        <Box>content</Box>
        <Input onChange={(e) => setContent(e.target.value)} />
        <Box>
          <Button onClick={add}>add</Button>
        </Box>
      </Box>
      <Box sx={{ background: "#6b996b" }}>
        <Box>email</Box>
        <Input onChange={(e) => setpass(e.target.value)} />
        <Box>pass</Box>
        <Input onChange={(e) => setemail(e.target.value)} />
        <Box>
          <Button onClick={regiseter}>add</Button>
        </Box>
      </Box>
      <Box>
        {data &&
          data.map((item) => {
            return (
              <Box sx={{ margin: "50px 0" }}>
                <Box>{item.title}</Box>
                <Box>{item.content}</Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default App;
