
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import RootLayout from './Layout/RootLayout'
import ModalForm from '../Components/ModalForm'
import Header from '../Components/Header'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Header />}></Route>
            <Route path='modalForm' element={<ModalForm />} />
        </Route>

    )
)