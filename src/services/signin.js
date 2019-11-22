import http from "@/api/http";

export const signin = {
  login: (data) => http.post("/signin", data)
}
