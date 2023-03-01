import {
    Container,

}
    from './components';
import {GoogleOAuthProvider} from "@react-oauth/google";
function App() {
  return (
      <GoogleOAuthProvider clientId='152442300175-sq3vjlp8smqsqibm415d0i044k5gci1c.apps.googleusercontent.com'>
        <div>
            <Container/>
        </div>
      </GoogleOAuthProvider>
  );
}
export default App;
