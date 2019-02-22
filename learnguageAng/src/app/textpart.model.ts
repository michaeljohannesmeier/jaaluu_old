
export class TextPart {
  public oTextHeadline: string[];
  public transHeadline: [[string]];
  public oTextParagraph: string[];
  public transParagraph: [[string]];



  constructor(
    oTextHeadline: string[],
    transHeadline: [[string]],
    oTextParagraph: string[],
    transParagraph: [[string]]
    ) {
      this.oTextHeadline = oTextHeadline;
      this.transHeadline = transHeadline;
      this.oTextParagraph = oTextParagraph;
      this.transParagraph = transParagraph;
  }
}

