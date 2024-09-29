import { Request, Response } from "express";
import axios from "axios";

export class IFoodController {
  async getUserCode(req: Request, res: Response): Promise<Response> {
    try {
      const response = await axios.post(
        "https://merchant-api.ifood.com.br/authentication/v1.0/oauth/userCode",
        {
          clientId: "2164574b-2c3f-4793-86dc-76133ffdf0c6",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { userCode, verificationUrlComplete } = response.data;
      return res.json({ userCode, verificationUrlComplete });
    } catch (error) {
        console.log('error', error.message)
      return res
        .status(500)
        .json({ message: "Error fetching user code", error: error.message });
    }
  }

  async exchangeAuthorizationCode(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { authorizationCode } = req.body;

    try {
      const response = await axios.post(
        "https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token",
        {
          grantType: "authorization_code",
          clientId: "2164574b-2c3f-4793-86dc-76133ffdf0c6",
          clientSecret:
            "12lk85bnlkw22x3zt6fgmlb1gboarn20p6lxqt7q7qdi2df7df3tqgh04mifv0m8mzpt0qgolkn4vdq6mbymdgvgshs9ga2zs1v",
          authorizationCode,
        }
      );

      const { accessToken, refreshToken } = response.data;
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error exchanging authorization code",
          error: error.message,
        });
    }
  }

  async getOrders(req: Request, res: Response): Promise<Response> {
    const { accessToken } = req.headers;

    if (!accessToken) {
      return res.status(400).json({ message: "Access Token required" });
    }

    try {
      const response = await axios.get(
        "https://merchant-api.ifood.com.br/orders/v1.0/orders",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orders = response.data;
      return res.json(orders);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching orders", error: error.message });
    }
  }

  async refreshAccessToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token required" });
    }

    try {
      const response = await axios.post(
        "https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token",
        {
          grantType: "refresh_token",
          clientId: "2164574b-2c3f-4793-86dc-76133ffdf0c6",
          clientSecret:
            "12lk85bnlkw22x3zt6fgmlb1gboarn20p6lxqt7q7qdi2df7df3tqgh04mifv0m8mzpt0qgolkn4vdq6mbymdgvgshs9ga2zs1v",
          refreshToken,
        }
      );

      const { accessToken, newRefreshToken } = response.data;
      return res.json({ accessToken, newRefreshToken });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error refreshing access token",
          error: error.message,
        });
    }
  }
}
