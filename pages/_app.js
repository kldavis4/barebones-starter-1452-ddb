import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || 0;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaCMS
            cmsCallback={(cms) => {
              cms.flags.set("tina-admin", true);
            }}
            branch="main"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
            tinaioConfig={{
              frontendUrlOverride: process.env.NEXT_PUBLIC_TINA_URL,
              contentApiUrlOverride: process.env.NEXT_PUBLIC_TINA_CONTENT_URL,
              identityApiUrlOverride: process.env.NEXT_PUBLIC_TINA_IDENTITY_URL
            }}
          >
            <Component {...pageProps} />
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  );
};

export default App;
