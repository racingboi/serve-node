import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {HelmetProvider} from 'react-helmet-async';
import {AuthProvider} from './contexts/AuthContext.jsx';
import {DevSupport} from "@react-buddy/ide-toolbox";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <AuthProvider>
                    <BrowserRouter>
                        <Suspense>
                            <DevSupport ComponentPreviews={ComponentPreviews}
                                        useInitialHook={useInitial}
                            >
                                <App/>
                            </DevSupport>
                        </Suspense>
                    </BrowserRouter>
                </AuthProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
)
