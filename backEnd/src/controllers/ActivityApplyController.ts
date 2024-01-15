import { Request, Response } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { GeneralResponse, commonResponse } from "../utilities/CommonResponse";
import { Users } from "../models/users";
import { ActivityApply } from "../models/activity_apply";
import { activityApplyMapper } from "../mapper/ActivityApplyMapper";
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const listApplyActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const volunteerId = decodedToken.id;
    const volunteer = await Users.findOne({
      where: {
        id: volunteerId,
        role_id: 1,
      },
    });
    if (volunteer) {
      const appliedVolunteersCurrent = await ActivityApply.findAll({
        where: { user_id: volunteerId },
      });
      const appliedVolunteers = await activityApplyMapper(appliedVolunteersCurrent)
      if (appliedVolunteers.length > 0) {
        const response: GeneralResponse<{
          appliedVolunteers: any[];
        }> = {
          status: 200,
          data: { appliedVolunteers },
          message: "Get list applied volunteers successfully",
        };
        commonResponse(req, res, response);
      } else {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: [],
          message: "Get list applied volunteers successfully",
        };
        commonResponse(req, res, response);
      }
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};

export const applyVolunteer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decodedToken.id;
    const user = await Users.findByPk(userId);
    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: "Have an organization or you're an organization",
        };
        commonResponse(req, res, response);
      } else {
        const checkRequestTime = await ActivityApply.findAll({
          where: {
            id: req.body.activity_id,
            user_id: userId,
            status: 0,
          },
        });
        if (checkRequestTime.length > 0) {
          const response: GeneralResponse<{}> = {
            status: 400,
            data: null,
            message: "Applied",
          };
          commonResponse(req, res, response);
        } else {
          const body = {
            user_id: Number(userId) as number,
            activity_id: Number(req.body.activity_id) as number,
            status: 0,
            created_at: new Date(),
            updated_at: new Date(),
          };
          const result = await ActivityApply.create(body);
          if (result) {
            const response: GeneralResponse<{}> = {
              status: 200,
              data: null,
              message: "Apply successfull",
            };
            commonResponse(req, res, response);
          }
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};
export const cancelApplyActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decodedToken.id;
    const user = await Users.findByPk(userId);
    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: "Have an organization or you're an organization",
        };
        commonResponse(req, res, response);
      } else {
        const result = await ActivityApply.destroy({
          where: {
            user_id: userId,
            activity_id: req.body.activity_id,
          },
        });
        if (result > 0) {
          const response: GeneralResponse<{}> = {
            status: 200,
            data: null,
            message: "Delete successful",
          };
          commonResponse(req, res, response);
        } else {
          const response: GeneralResponse<{}> = {
            status: 400,
            data: null,
            message: "No matching records found to delete",
          };
          commonResponse(req, res, response);
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};