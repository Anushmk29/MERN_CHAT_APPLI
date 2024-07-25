import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../Componets/ChatBox";
import MyChats from "../Componets/MyChats";
import SideDrawer from "../Componets/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProviderContext";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
