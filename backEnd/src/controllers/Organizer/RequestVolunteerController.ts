import { Request, Response } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import {
  GeneralResponse,
  commonResponse,
} from "../../utilities/CommonResponse";
import {
  VolunteerRequest,
  VolunteerRequestAttributes,
} from "../../models/volunteer_request";
import { Users } from "../../models/users";
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const listRequestVolunteers = async (
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

    const organizerId = decodedToken.id;
    const organizer = await Users.findOne({
      where: {
        id: organizerId,
        role_id: 2,
      },
    });
    if (organizer) {
      const requestVolunteers = await VolunteerRequest.findAll({
        where: { organization_id: organizerId },
      });
      if (requestVolunteers.length > 0) {
        const response: GeneralResponse<{
          requestVolunteers: VolunteerRequestAttributes[];
        }> = {
          status: 200,
          data: { requestVolunteers },
          message: "Get list request volunteers successfully",
        };
        commonResponse(req, res, response);
      } else {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: [],
          message: "Get list request volunteers successfully",
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

export const updateRequestVolunteer = async (
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

    const organizerId = decodedToken.id;
    const organizer = await Users.findOne({
      where: {
        id: organizerId,
        role_id: 2,
      },
    });
    if (organizer) {
      const volunteerId = req.body.user_id as number;
      const checkStatus = req.body.status as number;
      if (checkStatus === 0) {
        const body = { status: 0, updated_at: new Date() };
        const volunteerRequestRecord = await VolunteerRequest.findOne({where: {user_id: volunteerId}})
        if (volunteerRequestRecord) {
          const result = await volunteerRequestRecord.update(body);
          const accountUser = await Users.findByPk(
            volunteerRequestRecord.user_id
          );
          if (result && accountUser) {
            const resultTwo = await accountUser.update({
              organization_id: organizerId,
              updated_at: new Date(),
            });
            if (resultTwo) {
              const response: GeneralResponse<{}> = {
                status: 200,
                data: null,
                message: "Update successfully",
              };
              commonResponse(req, res, response);
            }
          }
        }
      } else {
        const body = { status: 2, updated_at: new Date() };
        const volunteerRequestRecord = await VolunteerRequest.findByPk(
          volunteerId
        );
        if (volunteerRequestRecord) {
          const result = await volunteerRequestRecord.update(body);
          if (result) {
            const response: GeneralResponse<{}> = {
              status: 200,
              data: null,
              message: "Update successfully",
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
