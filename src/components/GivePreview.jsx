import useChurchSettings from "../hooks/useChurchSettings";

function GivePreview() {
  const { settings, loading } = useChurchSettings();

  const equityPaybill =
    settings?.equity_paybill?.trim() || "247247";

  const churchAccount =
    settings?.church_account?.trim() || "883683";

  const mpesaPaybill =
    settings?.mpesa_paybill?.trim() || "4020297";

  if (loading) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">Loading giving information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">
            Give &amp; Support
          </h2>

          <p className="mt-4 text-gray-600">
            Your generosity helps us spread the Gospel and support
            the work of the ministry.
          </p>
        </div>

        {/* Give Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="rounded-xl shadow-lg bg-white p-6">
            <h3 className="text-xl font-bold text-green-700">
              Equity Bank
            </h3>

            <p className="mt-3 text-gray-600">
              <strong className="text-gray-800">Paybill:</strong>{" "}
              {equityPaybill}
            </p>

            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Account:</strong>{" "}
              {churchAccount}
            </p>
          </div>

          <div className="rounded-xl shadow-lg bg-white p-6">
            <h3 className="text-xl font-bold text-green-700">
              M-Pesa
            </h3>

            <p className="mt-3 text-gray-600">
              <strong className="text-gray-800">Paybill:</strong>{" "}
              {mpesaPaybill}
            </p>

            <p className="mt-2 text-gray-600">
              Use the church's M-Pesa Paybill to support the
              ministry.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GivePreview;