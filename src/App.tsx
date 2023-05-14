import { useState } from 'react'
import Chat from './components/Chat'
import ConversationContextProvider from './components/Context/ConversationContext'
import Layout from './components/Layout'
import ProfileSettingsDialog from './components/dialogs/ProfileSettingsDialog'

const App = () => {
  const [isUserDataExist, setIsUserDataExist] = useState(
    Boolean(sessionStorage.getItem('idInstance') && sessionStorage.getItem('apiTokenInstance'))
  )

  return (
    <Layout>
      {!isUserDataExist ? (
        <ProfileSettingsDialog setIsUserExist={() => setIsUserDataExist(true)} />
      ) : (
        <ConversationContextProvider>
          <Chat />
        </ConversationContextProvider>
      )}
    </Layout>
  )
}

export default App
