import org.json.JSONObject;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.List;

/**
 * A non-public record to hold point data. 
 * Because it's not public, it can be in the same file as QuadraticSolver.
 */
record Point(BigDecimal x, BigDecimal y) {}

public class QuadraticSolver {

    // For division, we need to specify precision to avoid errors. 50 digits is plenty.
    private static final MathContext MC = new MathContext(50);

    public static void main(String[] args) {
        try {
            // We will use the first 3 points to solve your original quadratic problem.
            List<Point> points = loadPoints("data.json", 3);
            System.out.println("✅ Points loaded successfully from new format.");
            for (Point p : points) {
                System.out.println("  - Point(x=" + p.x() + ", y=" + p.y().toBigInteger() + ")");
            }

            BigDecimal constantC = findConstantC(points);

            System.out.println("\n------------------------------------");
            System.out.println("🎯 The calculated constant C is: " + constantC.toBigInteger());
            System.out.println("------------------------------------");

        } catch (Exception e) {
            System.err.println("❌ An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static BigDecimal findConstantC(List<Point> points) {
        Point p0 = points.get(0);
        Point p1 = points.get(1);
        Point p2 = points.get(2);

        BigDecimal x0 = p0.x(), y0 = p0.y();
        BigDecimal x1 = p1.x(), y1 = p1.y();
        BigDecimal x2 = p2.x(), y2 = p2.y();

        BigDecimal term0_num = y0.multiply(x1).multiply(x2);
        BigDecimal term0_den = (x0.subtract(x1)).multiply(x0.subtract(x2));
        BigDecimal term0 = term0_num.divide(term0_den, MC);

        BigDecimal term1_num = y1.multiply(x0).multiply(x2);
        BigDecimal term1_den = (x1.subtract(x0)).multiply(x1.subtract(x2));
        BigDecimal term1 = term1_num.divide(term1_den, MC);
        
        BigDecimal term2_num = y2.multiply(x0).multiply(x1);
        BigDecimal term2_den = (x2.subtract(x0)).multiply(x2.subtract(x1));
        BigDecimal term2 = term2_num.divide(term2_den, MC);

        return term0.add(term1).add(term2);
    }

    public static List<Point> loadPoints(String filePath, int pointCount) throws IOException {
        List<Point> points = new ArrayList<>();
        try (FileReader reader = new FileReader(filePath)) {
            JSONObject json = new JSONObject(reader);
            for (int i = 1; i <= pointCount; i++) {
                String key = String.valueOf(i);
                if (!json.has(key)) break;

                JSONObject pointObj = json.getJSONObject(key);
                int base = Integer.parseInt(pointObj.getString("base"));
                String valueStr = pointObj.getString("value");

                BigDecimal x = new BigDecimal(key);
                BigDecimal y = new BigDecimal(new BigInteger(valueStr, base));
                
                points.add(new Point(x, y));
            }
        }
        return points;
    }
}