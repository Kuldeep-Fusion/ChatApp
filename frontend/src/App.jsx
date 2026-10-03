import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashBoard from "./dashboard/DashBoard";
import Login from "./auth/login";
import Register from "./auth/Register";
import Message from "./dashboard/messages/Message";
import SingleChat from "./dashboard/chat/SingleChat";
import UserProfile from "./dashboard/Profile/UserProfile";
import Explore from "./dashboard/Explore/Explore";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NotFound from "./NotFound";
import Developer from "./dashboard/pages/Developer";
import Welcome from "./dashboard/pages/Welcome";
import WelcomeGate from "./Routes/WelcomeGate";
import Friends from "./dashboard/friends/Friends";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

       
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<Welcome />} />

           <Route element={<WelcomeGate />}>
            <Route path="/" element={<DashBoard />}>
            <Route path="messages" element={<Message />} />
            <Route path="chats" element={<SingleChat />} />

             <Route path="chat/:id" element={<SingleChat />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="developer" element={<Developer/>}/>
            <Route path="friends" element={<Friends/>}/>
          </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;