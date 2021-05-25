import { Layout } from "../components";
import "../assets/styles/index.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
};

export default MyApp;
