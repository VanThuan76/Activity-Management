import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { GeneralResponse, commonResponse } from "../utilities/CommonResponse";
import { Organization, OrganizationAttributes } from "../models/organization";
import { organizationMapper } from "../mapper/OrganizationMapper";
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const listOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const organizationsCurrent = await Organization.findAll({
      where: { status: 0 },
    });
    const organizations = await organizationMapper(organizationsCurrent);
    if (organizations.length > 0) {
      const response: GeneralResponse<{
        organizations: OrganizationAttributes[];
      }> = {
        status: 200,
        data: {
          organizations: organizations as unknown as OrganizationAttributes[],
        },
        message: "Get list organizations successfully",
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: "Get list organizations successfully",
      };
      commonResponse(req, res, response);
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
export const detailOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    if (organization) {
      const response: GeneralResponse<{
        organization: OrganizationAttributes;
      }> = {
        status: 200,
        data: {
          organization: organization.toJSON(),
        },
        message: "Get organization details successfully",
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 404,
        data: null,
        message: "Organization not found",
      };
      commonResponse(req, res, response);
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
export const createOrganization = async (
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
    if (userId) {
      const body = {
        name: req.body.name as string,
        description: req.body.description as string,
        location: req.body.location as string,
        creator: userId as number,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result = await Organization.create(body);
      if (result) {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: result,
          message: "Create successfull",
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
