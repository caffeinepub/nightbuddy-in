import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";



actor {
  type Signup = {
    name : Text;
    email : Text;
    ageRange : Text;
    country : Text;
    gender : Text;
    timestamp : Int;
    userId : Text;
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

    if (signups.any(func(s) { s.email == email })) {
      Runtime.trap("Email already signed up");
    };

    let timestamp = Time.now();
    let userId = "user_" # timestamp.toText();

    let newSignup : Signup = {
      name;
      email;
      ageRange = "";
      country = "";
      gender = "";
      timestamp;
      userId;
    };

    signups := signups.concat([newSignup]);
    "You're on the list! We'll be in touch.";
  };

  public shared ({ caller }) func submitProfile(email : Text, ageRange : Text, country : Text, gender : Text) : async Text {
    var found = false;
    let updatedSignups = signups.map(
      func(signup) {
        if (signup.email == email) {
          found := true;
          { signup with ageRange; country; gender };
        } else {
          signup;
        };
      }
    );

    if (found) {
      signups := updatedSignups;
      "Profile information updated successfully!";
    } else {
      Runtime.trap("Email not found");
    };
  };

  public query ({ caller }) func isEmailRegistered(email : Text) : async Bool {
    signups.any(func(s) { s.email == email });
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signups;
  };

  public query ({ caller }) func getSignupByEmail(email : Text) : async ?Signup {
    signups.find(func(s) { s.email == email });
  };

  public query ({ caller }) func getAllSignupsSorted() : async [Signup] {
    signups.sort();
  };

  public query ({ caller }) func getAllSignupsSortedByEmail() : async [Signup] {
    signups.sort(Signup.compareByEmail);
  };

  public query ({ caller }) func getSignupCount() : async Nat {
    signups.size();
  };

  public query ({ caller }) func getSignupCountForCountry(country : Text) : async Nat {
    signups.filter(func(signup) { signup.country == country }).size();
  };
};
