import { Request, Response } from "express";
import * as dotenv from "dotenv";
import {
  GeneralResponse,
  commonResponse,
} from "../../utilities/CommonResponse";
import { Feedback } from "../../models/feedback";
import { feedbackMapper } from "../../mapper/FeedbackMapper";
dotenv.config();

export const listFeedBack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbacksCurrent = await Feedback.findAll();
    const feedbacks = await feedbackMapper(feedbacksCurrent); // Sử dụng hàm mapper
    if (feedbacks.length > 0) {
      const response: GeneralResponse<{
        feedbacks: any;
      }> = {
        status: 200,
        data: { feedbacks },
        message: "Get list feedback successfully",
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: "Get list feedback successfully",
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
