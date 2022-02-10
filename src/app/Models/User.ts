import { AwardAndRecognition } from "./AwardAndRecognition";

export class User {
    'id' : Number;
    'department_name': string;
    'room_number': string;
    'name': string;
    'designation': string
    'phone': string;
    'email': string;
    'website': string;
    'photo': string;
    'biographyFiledOfSpecialization': string;
    "desigination_name": string;
    "role": string;
    'award_and_recognitions' : AwardAndRecognition[];
}
