import React from "react";
import Link from "component/link";
import CardVerify from "component/cardVerify";
import lbryio from "lbryio.js";

class UserVerify extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };
  }

  handleCodeChanged(event) {
    this.setState({
      code: event.target.value,
    });
  }

  onToken(data) {
    this.props.verifyUserIdentity(data.id);
  }

  render() {
    const { errorMessage, isPending, navigate } = this.props;
    return (
      <div>
        <section className="card card--form">
          <div className="card__title-primary">
            <h1>{__("Final Human Proof")}</h1>
          </div>
          <div className="card__content">
            <p>
              Finally, please complete <strong>one and only one</strong> of the
              options below.
            </p>
          </div>
        </section>
        <section className="card card--form">
          <div className="card__title-primary">
            <h3>{__("1) Proof via Credit")}</h3>
          </div>
          <div className="card__content">
            {__(
              "If you have a valid credit or debit card, you can use it to instantly prove your humanity."
            ) +
              " " +
              __("There is no charge at all for this, now or in the future.") +
              " "}
          </div>
          <div className="card__actions">
            {errorMessage &&
              <p className="form-field__error">{errorMessage}</p>}
            <CardVerify
              label={__("Perform Card Verification")}
              disabled={isPending}
              token={this.onToken.bind(this)}
              stripeKey={lbryio.getStripeToken()}
            />
          </div>
          <div className="card__content">
            <div className="meta">
              {__(
                "A $1 authorization may temporarily appear with your provider."
              )}{" "}
              {" "}
              <Link
                href="https://lbry.io/faq/identity-requirements"
                label={__("Read more about why we do this.")}
              />
            </div>
          </div>
        </section>
        <section className="card card--form">
          <div className="card__title-primary">
            <h3>{__("2) Proof via YouTube")}</h3>
          </div>
          <div className="card__content">
            <p>
              {__(
                "If you have a YouTube account with published videos, you can sync your account to be granted instant verification."
              )}
            </p>
          </div>
          <div className="card__actions">
            <Link
              href="https://api.lbry.io/yt/connect"
              button="alt"
              icon="icon-youtube"
              label={__("YouTube Account Sync")}
            />
          </div>
          <div className="card__content">
            <div className="meta">
              This will not automatically refresh after approval. Once you have
              synced your account, just navigate away or click
              {" "} <Link navigate="/rewards" label="here" />.
            </div>
          </div>
        </section>
        <section className="card card--form">
          <div className="card__title-primary">
            <h3>{__("3) Proof via Chat")}</h3>
          </div>
          <div className="card__content">
            <p>
              {__(
                "A moderator capable of approving you is typically available in the #verification channel of our chat room."
              )}
            </p>
            <p>
              {__(
                "This process will likely involve providing proof of a stable and established online or real-life identity."
              )}
            </p>
          </div>
          <div className="card__actions">
            <Link
              href="https://slack.lbry.io"
              button="alt"
              icon="icon-slack"
              label={__("Join LBRY Chat")}
            />
          </div>
        </section>
        <section className="card card--form">
          <div className="card__title-primary">
            <h5>{__("Or, Skip It Entirely")}</h5>
          </div>
          <div className="card__content">

            <p className="meta">
              {__(
                "You can continue without this step, but you will not be eligible to earn rewards."
              )}
            </p>

          </div>
          <div className="card__actions">
            <Link
              onClick={() => navigate("/discover")}
              button="alt"
              label={__("Skip Rewards")}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default UserVerify;
