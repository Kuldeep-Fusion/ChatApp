import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashBoard from "./dashboard/DashBoard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Message from "./dashboard/messages/Message";
import SingleChat from "./dashboard/chat/SingleChat";
import UserProfile from "./dashboard/Profile/UserProfile";
import Explore from "./dashboard/Explore/Explore";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NotFound from "./NotFound";
import Friends from "./dashboard/friends/Friends";
import ChatWithAI from "./dashboard/AIChat/ChatWithAI";
import SearchPage from "./dashboard/search/SearchPage";
import ProfilePopup from "./dashboard/Profile/SingleProfile/SingleProfile";
import PrivacyPolicy from "./dashboard/pages/PrivacyPolicy";




function App() {
  return (
    <BrowserRouter>
      <Routes>  


        
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

       
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashBoard />}>
            <Route path="messages" element={<Message />} />
            <Route path="chats" element={<SingleChat />} />
             <Route path="chat/:id" element={<SingleChat />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="friends" element={<Friends/>}/>
            <Route path="chatwithai" element={<ChatWithAI/>}/>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<ProfilePopup />} />
            <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;