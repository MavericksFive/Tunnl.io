import * as React from "react"
import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import GetStartedPage from "./components/GetStartedPage"
import LoginPage from "./components/Login"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import Home from "./components/Home"
import { APIENDPOINT } from "@env"
import { Web3Provider } from "./utils/Web3Context"
import ChatScreen from "./components/Categories/Chats/ChatScreen"
import DetailsContract from "./components/Categories/Contracts/DetailsContract"
import { DealsProvider } from "./utils/DealsContext"
import { DemoStageProvider } from "./utils/DemoContext"
import { TransactionProvider } from "./utils/TransactionContext"
import TransactionModal from "./components/Transaction"

const APIURL = "https://api.studio.thegraph.com/query/59587/haha_subgraph/v0.3.8"

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache()
})

const Stack = createStackNavigator()

export default function App() {
    const [userName, setUserName] = useState<string>("")
    const [wallet, setWallet] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [pk, setPk] = useState<string>("")

    const checklogin = async () => {
        if (APIENDPOINT) {
            try {
                const response = await fetch(`${APIENDPOINT}users/user/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                if (!response.ok) {
                    setUserName("")
                    setWallet("")
                    setUserEmail("")
                    throw new Error(`Error `)
                }
                const res = await response.json()

                setUserName(res.name)
                setWallet(res.wallet)
                setUserEmail(res.email)
                setPk(res.priKey)
            } catch (error) {
                setUserName("")
                setWallet("")
                setUserEmail("")
            } finally {
            }
        } else {
        }
    }

    useEffect(() => {
        checklogin()
    }, [])
    
    return (
        <Web3Provider>
            <ApolloProvider client={client}>
                <DealsProvider wallet={wallet}>
                    <DemoStageProvider>
                    <TransactionProvider>
                        <TransactionModal />
                            <NavigationContainer>
                                <Stack.Navigator
                                    screenOptions={{
                                        headerShown: false
                                    }}
                                >
                                    {userName === "" ? (
                                        <>
                                            <Stack.Screen name="GetStarted" component={GetStartedPage} />
                                            <Stack.Screen name="Login">
                                                {props => <LoginPage {...props} checklogin={checklogin} />}
                                            </Stack.Screen>
                                        </>
                                    ) : (
                                        <Stack.Screen name="Home">
                                            {props => (
                                                <Home
                                                    {...props}
                                                    userName={userName}
                                                    wallet={wallet}
                                                    userEmail={userEmail}
                                                    checklogin={checklogin}
                                                    pk={pk}
                                                />
                                            )}
                                        </Stack.Screen>
                                    )}
                                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                                <Stack.Screen name="DetailsContract" component={DetailsContract} />

                            </Stack.Navigator>
                            <StatusBar style="auto" />
                            </NavigationContainer>
                        </TransactionProvider>
                    </DemoStageProvider>
                </ DealsProvider>
        </ApolloProvider>
        </Web3Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})
