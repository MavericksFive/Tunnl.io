import { GetStartedPageProps } from "@/utils/StackNavigation"
import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { APIENDPOINT } from "@env"

export default function RegisterPage({ navigation, setState }: GetStartedPageProps) {
    const [userName, setUserName] = useState("")
    const [checking, setChecking] = useState<boolean>(false)
    const [available, setAvailable] = useState<boolean>(false)
    const checkName = async (name: string) => {
        if (APIENDPOINT) {
            try {
                const response = await fetch(`http://localhost:8000/users/checkname/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name })
                })

                if (!response.ok) {
                    throw new Error(`Error `)
                }

                setAvailable(true)
            } catch (error) {
            } finally {
                setChecking(false)
            }
        } else {
            console.log("API endpoint is not defined")
        }
    }

    useEffect(() => {
        alert(userName)
        if (userName === "") return

        setChecking(true)
        const timeoutId = setTimeout(async () => {
            await checkName(userName)
        }, 200)

        return () => clearTimeout(timeoutId)
    }, [userName])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Get your username</Text>
            <Text style={styles.subtitle}>Create a username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                placeholder="ie. Charolette_98"
                keyboardType="default"
            />

            <Text style={styles.termsText}>
                * The Username must be 3 to 16 characters and can consist of letters, numbers,
                hyphens (-) and underscores (_).
            </Text>
            <Text style={styles.termsText}>* The first character must be a letter.</Text>
            <Text style={styles.termsText}>* Letters are not case-sensitive.</Text>

            <TouchableOpacity disabled={!available || checking} style={styles.button}>
                <Text style={styles.buttonText}>{checking ? "Checking..." : "Continue"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonOutline}
                onPress={() => {
                    if (setState) setState("LoginPage")
                }}
            >
                <Text style={styles.buttonOutlineText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10
    },
    subtitle: {
        width: "97%",
        fontSize: 12,
        textAlign: "left",
        fontWeight: "400",
        marginTop: 40,
        color: "#14161B"
    },
    input: {
        height: 50,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#ddd"
    },
    button: {
        position: "absolute",
        backgroundColor: "rgba(0, 255, 255, 1)",
        borderRadius: 25,
        padding: 15,
        width: "40%",
        alignItems: "center",
        bottom: 70,
        right: 30
    },
    buttonText: {
        color: "#14161B",
        fontSize: 18
    },
    termsText: {
        width: "97%",
        fontSize: 14,
        color: "#888",
        textAlign: "left"
    },
    linkText: {
        color: "#00BFFF",
        marginTop: 20
    },
    buttonOutline: {
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(20, 22, 27, 1)",
        borderRadius: 25,
        padding: 15,
        width: "40%",
        alignItems: "center",
        bottom: 70,
        left: 30
    },
    buttonOutlineText: {
        color: "rgba(20, 22, 27, 1)",
        fontSize: 18
    }
})
