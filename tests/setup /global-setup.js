import {test as setup, expect} from "@playwright/test";
import { STORAGE_STATE } from "../../playwright.config";

setup ('do login', async ({page})=> {
    const response = await page.request.post('https://qauto.forstudy.space/api/auth/signin', {
        data: {
            "email": process.env.USER_EMAIL,
            "password": process.env.USER_PASSWORD,
            "remember": false
        }
    })

    const resp = await response.json()

    expect(resp.status).toEqual('ok')

    await page.context().storageState({ path: STORAGE_STATE })
})
