import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";



actor {
  type Signup = {
    name : Text;
    email : Text;
    ageRange : Text;
    country : Text;
    gender : Text;
    timestamp : Int;
  };

  module Signup {
    public func compare(signup1 : Signup, signup2 : Signup) : Order.Order {
      switch (Text.compare(signup1.name, signup2.name)) {
        case (#equal) { Text.compare(signup1.email, signup2.email) };
        case (order) { order };
      };
    };

    public func compareByEmail(signup1 : Signup, signup2 : Signup) : Order.Order {
      Text.compare(signup1.email, signup2.email);
    };
  };

  stable var signups = Array.empty<Signup>();
  stable var signupsBuffer = Array.empty<Signup>();

  system func preupgrade() {
    signups := Array.empty<Signup>();
  };

  system func postupgrade() {
    signups := Array.empty<Signup>();
  };

  func validateInputs(name : Text, email : Text) {
    if (name.trim(#char ' ') == "" or name.isEmpty()) {
      Runtime.trap("Name cannot be empty");
    };

    if (email.trim(#char ' ') == "" or email.isEmpty() or not email.contains(#char '@')) {
      Runtime.trap("Invalid email address");
    };
  };

  public shared ({ caller }) func submitSignup(name : Text, email : Text) : async Text {
    validateInputs(name, email);

    if (signupsBuffer.any(func(s) { s.email == email })) {
      Runtime.trap("Email already signed up");
    };

    let newSignup : Signup = {
      name;
      email;
      ageRange = "";
      country = "";
      gender = "";
      timestamp = Time.now();
    };

    signupsBuffer := signupsBuffer.concat([newSignup]);
    "You're on the list! We'll be in touch.";
  };

  public shared ({ caller }) func submitProfile(email : Text, ageRange : Text, country : Text, gender : Text) : async Text {
    let updatedSignups = signupsBuffer.map(
      func(signup) {
        if (signup.email == email) {
          { signup with ageRange; country; gender };
        } else {
          signup;
        };
      }
    );

    if (updatedSignups == signupsBuffer) {
      Runtime.trap("Email not found");
    } else {
      signupsBuffer := updatedSignups;
      "Profile information updated successfully!";
    };
  };

  public query ({ caller }) func isEmailRegistered(email : Text) : async Bool {
    signupsBuffer.any(func(s) { s.email == email });
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signupsBuffer;
  };

  public query ({ caller }) func getSignupByEmail(email : Text) : async ?Signup {
    signupsBuffer.find(func(s) { s.email == email });
  };

  public query ({ caller }) func getAllSignupsSorted() : async [Signup] {
    signupsBuffer.sort();
  };

  public query ({ caller }) func getAllSignupsSortedByEmail() : async [Signup] {
    signupsBuffer.sort(Signup.compareByEmail);
  };
};
