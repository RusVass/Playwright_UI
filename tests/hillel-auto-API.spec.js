import { test, request,expect } from '@playwright/test'

test.describe('API testing', async ()=>{

test.skip('API POST test', async ({page}) => {
    const response = await page.request.post('/api/auth/signin', {
        data: {
            "email": process.env.USER_EMAIL,
            "password": process.env.USER_PASSWORD,
            "remember": false
        }
    })

    console.log(await response.json())
    const respJson = await response.json()
    expect(respJson.status).toEqual('ok')

    await page.goto('/')

})


test.skip('API test with separate context', async ({page}) => {
    const requestContext = await request.newContext()
    const response = await requestContext.post('/api/auth/signin', {
        data: {
            "email": process.env.USER_EMAIL,
            "password": process.env.USER_PASSWORD,
            "remember": false
        }
    })

    console.log(await response.json())
    const respJson = await response.json()
    expect(respJson.status).toEqual('ok')

    await page.goto('/')
    await page.pause()
})




test.skip('API test with separate context 2', async () => {
    const api = await request.newContext()
    const response = await api.post('/api/auth/signin', {
        data: {
            "email": process.env.USER_EMAIL,
            "password": process.env.USER_PASSWORD,
            "remember": false
        }
    })

    const resp = await response.json()

   // expect(resp.status).toEqual('ok')
})
})