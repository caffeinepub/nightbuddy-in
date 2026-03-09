import Array "mo:core/Array";
import Text "mo:core/Text";

module {
  type OldSignup = {
    name : Text;
    email : Text;
    ageRange : Text;
    country : Text;
    gender : Text;
    timestamp : Int;
  };

  type OldActor = {
    signups : [OldSignup];
    signupsBuffer : [OldSignup];
  };

  type NewSignup = {
    name : Text;
    email : Text;
    ageRange : Text;
    country : Text;
    gender : Text;
    timestamp : Int;
    userId : Text;
  };

  type NewActor = {
    signups : [NewSignup];
  };

  public func run(old : OldActor) : NewActor {
    let newSignups = old.signups.concat(old.signupsBuffer).map(
      func(oldSignup) {
        { oldSignup with userId = "user_" # oldSignup.timestamp.toText() };
      }
    );
    { signups = newSignups };
  };
};
