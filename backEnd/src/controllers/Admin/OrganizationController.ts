import { Request, Response } from "express";
import {
  GeneralResponse,
  commonResponse,
} from "../../utilities/CommonResponse";
import { Organization } from "../../models/organization";
import { Users } from "../../models/users";

export const deleteOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    const user = await Users.findOne({ where: { organization_id: id } });
    if (organization) {
      await organization.destroy();
      if (user) {
        const body = {
          organization_id: null,
        };
        await user.update(body);
      }
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: "Delete organizations successfully",
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: "Not found Organization",
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
export const updateOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
      return;
    }
    const updatedFields = {
      name: req.body.name as string,
      description: req.body.description as string,
      location: req.body.location as string,
      status: req.body.status as number,
      updated_at: new Date(),
    };

    const updatedOrganization = await organization.update(updatedFields);

    if (updatedOrganization) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: updatedOrganization.toJSON(),
        message: "Organization updated successfully",
      };
      commonResponse(req, res, response);
    } else {
      res.status(400).json({ message: "Failed to update organization" });
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
