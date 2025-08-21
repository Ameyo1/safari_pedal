"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Link from "next/link";

export default function SignUpForm() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Auto-login after signup
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/"); // Protected route
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
            <Link href="/signin" passHref className="block text-center mt-4 text-blue-600 hover:underline">
              Already have an account? Log in
            </Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}




// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [errorCode, setErrorCode] = useState<string | null>(null);

//   async function handleSubmit(formData: FormData) {
//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         email: formData.get("email"),
//         password: formData.get("password"),
//         name: formData.get("name"),
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setErrorCode(data.code || "UNKNOWN_ERROR");
//       return;
//     }

//     router.push("/login?signup=success");
//   }

//   const errorMessages: Record<string, string> = {
//     MISSING_FIELDS: "Tafadhali jaza sehemu zote muhimu.",
//     USER_EXISTS: "Akaunti tayari ipo.",
//     RATE_LIMITED: "Umejaribu mara nyingi. Tafadhali subiri kidogo.",
//     SERVER_ERROR: "Hitilafu ya ndani. Jaribu tena baadaye.",
//     UNKNOWN_ERROR: "Hitilafu isiyojulikana.",
//   };

//   return (
//     <form action={handleSubmit} className="max-w-md mx-auto space-y-4 p-6">
//       <h1 className="text-xl font-bold">Jisajili</h1>

//       <input name="name" type="text" placeholder="Jina lako" required className="input" />
//       <input name="email" type="email" placeholder="Barua pepe" required className="input" />
//       <input name="password" type="password" placeholder="Nenosiri" required className="input" />

//       {errorCode && (
//         <p className="text-red-600 text-sm">
//           {errorMessages[errorCode] || errorMessages.UNKNOWN_ERROR}
//         </p>
//       )}

//       <button type="submit" className="btn-primary">Tuma</button>
//     </form>
//   );
// }

