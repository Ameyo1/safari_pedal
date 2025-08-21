// import { getStrapiURL } from "@/lib/utils";

// interface RegisterUserProps {
//   username: string;
//   password: string;
//   email: string;
// }

// interface LoginUserProps {
//   identifier: string;
//   password: string;
// }

// const baseUrl = getStrapiURL();

// export async function registerUserService(userData: RegisterUserProps) {
//   const url = new URL("/api/auth/local/register", baseUrl);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...userData }),
//       cache: "no-cache",
//     });

//     return response.json();
//   } catch (error) {
//     console.error("Registration Service Error:", error);
//   }
// }

// export async function loginUserService(userData: LoginUserProps) {
//   const url = new URL("/api/auth/local", baseUrl);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...userData }),
//       cache: "no-cache",
//     });

//     return response.json();
//   } catch (error) {
//     console.error("Login Service Error:", error);
//     throw error;
//   }
// }

// Remove Strapi-specific logic and use Sanity endpoints

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

// // Set your backend API base URL in .env as NEXT_PUBLIC_API_URL
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// // Register with Sanity (custom backend endpoint)
// export async function registerWithSanityService(userData: RegisterUserProps) {
//   try {
//     const response = await fetch(`${baseUrl}/api/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//       cache: "no-cache",
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { error: data.error || "Registration failed" };
//     }

//     return { jwt: data.token, user: data.user };
//   } catch (error) {
//     console.error("Sanity Registration Service Error:", error);
//     return { error: "Network error" };
//   }
// }

// // Login with Sanity (custom backend endpoint)
// export async function loginWithSanityService(userData: LoginUserProps) {
//   try {
//     const response = await fetch(`${baseUrl}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//       cache: "no-cache",
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { error: data.error || "Login failed" };
//     }

//     return { jwt: data.token, user: data.user };
//   } catch (error) {
//     console.error("Sanity Login Service Error:", error);
//     return { error: "Network error" };
//   }
// }